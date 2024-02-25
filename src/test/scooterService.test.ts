import { fetchScooterData, ScooterData } from '../ts/scooterService';

// Mock the global fetch function
global.fetch = jest.fn();

beforeEach(() => {
    
  // Resets the mock to its original state and clears calls made before each test
  jest.resetAllMocks();
});

test('fetches scooter data successfully from the local data file', async () => {
  // Set up the mock fetch function for this test
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(<ScooterData>{ type: "FeatureCollection", features: [] }),
  });

  const data = await fetchScooterData();
  expect(data).toHaveProperty('type', 'FeatureCollection');
  expect(data.features).toBeInstanceOf(Array);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('/data/scooters.json');
});

test('handles fetch failure gracefully', async () => {
  // Set up the mock fetch function to simulate a failure
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: 404,
  });

  // Expect the function to throw an error when the response is not ok
  await expect(fetchScooterData()).rejects.toThrow('Network response was not ok');

  // Verify that fetch was called
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('/data/scooters.json');
}); 
