import algoliasearch from 'algoliasearch'
import { supabase } from './supabase';
import { toast } from '../utils/toast';

const algoliaClient = algoliasearch(process.env.EXPO_PUBLIC_ALGOLIA_APP_ID as string, process.env.EXPO_PUBLIC_ALGOLIA_API_KEY as string);
const algoliaIndex = algoliaClient.initIndex('foodOrdering');
 async function syncSupabaseToAlgolia() {
    try {
      // Fetch data from Supabase
      const { data: records, error } = await supabase
        .from('products')
        .select('*');
  
      if (error) {
        throw error;
      }
  
      // Prepare data for Algolia
      const objectsToIndex = records.map(record => ({
        objectID: record.id.toString(),
        ...record,
      }))
      await algoliaIndex.saveObjects(objectsToIndex);

      console.log('Data synced to Algolia successfully');
    } catch (error: any) {
      console.error('Error syncing data to Algolia:', error.message);
    }
  }
  async function searchInAlgolia(query: string) {
    try {
      const { hits } = await algoliaIndex.search(query);
      return hits;
    } catch (error: any) {
      console.error('Algolia search error:', error.message);
      return [];
    }
  }

  export async function searchQuery(query:string){
    if(!query) return "No search text"
    try {
         await syncSupabaseToAlgolia()
         const results = await searchInAlgolia('search_query_here');
        console.log('Search results:', results);
        return results
    } catch (error) {
        toast(JSON.stringify(error), "red")
    }


  }