export type ScooterFeature = {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {
      OBJECTID: number;
      ABSTELL_ID: number;
      BEZIRK: number;
      ADRESSE: string;
      STATUS: string;
      ANZ_SCOOTER: number | null;
      WEBLINK1: string | null;
    };
  };
  
  export type ScooterData = {
    type: string;
    features: ScooterFeature[];
  };
  
  export const fetchScooterData = async (): Promise<ScooterData> => {
    try {
      const response = await fetch('/data/scooters.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ScooterData = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem fetching the scooter data:', error);
      throw error;
    }
  };