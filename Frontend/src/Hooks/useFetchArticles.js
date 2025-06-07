import { useEffect, useState } from 'react';
import { axiosInstance } from "../API/axios";
import { ARTICLE_SEARCH_URL } from "../API/APIRoutes"; // adjust the path if needed

const useFetchArticles = (term, page = 1, size = 5) => {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axiosInstance.get(ARTICLE_SEARCH_URL, {
                    params: {
                        term,
                        page: page - 1,
                        size
                    }
                });

                setData(response.data.content || []);
                setTotalPages(response.data.totalPages || 0);
            } catch (err) {
                setError(err);
                setData([]);
                setTotalPages(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [term, page, size]);

    return { data, totalPages, isLoading, error };
};

export default useFetchArticles;
