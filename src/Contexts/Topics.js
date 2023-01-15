import { createContext, useState, useEffect } from 'react';
import * as api from '../api';

export const TopicsContext = createContext();

export const TopicsProvider = ({children}) => {
const [topics, setTopics] = useState(['coding', 'football', 'cooking']);
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);
const [fetchTopics, setFetchTopics] = useState(false);

useEffect(() => {
    setApiError(false);
    setIsLoading(true);
    api.fetchTopics()
    .then(({topics}) => {
      setIsLoading(false);
      setTopics(topics);
    })
    .catch(() => {
      setIsLoading(false);
      setApiError(true);
    });
  }, [fetchTopics]);

return <TopicsContext.Provider value={{topics, setTopics, isLoading, apiError, setFetchTopics}}>
  {children}
</TopicsContext.Provider>
};