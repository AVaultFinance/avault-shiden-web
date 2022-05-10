import { Farm } from 'state/types';
import fetchPublicFarmData, { PublicFarmData } from './fetchPublicFarmData';

const fetchFarm = async (farm: Farm, priceVsBusdMap: Record<string, string>): Promise<Farm & PublicFarmData> => {
  const farmPublicData = await fetchPublicFarmData(farm, priceVsBusdMap);

  return { ...farm, ...farmPublicData };
};

export default fetchFarm;
