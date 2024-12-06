import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const useTableData = (initialUrl) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [orderColumn, setOrderColumn] = useState(0);
    const [orderDirection, setOrderDirection] = useState('asc');
    const [url, setUrl] = useState(initialUrl);
    const perPage = 10;

    const prevSearchQuery = useRef(searchQuery);
    const prevOrderColumn = useRef(orderColumn);
    const prevOrderDirection = useRef(orderDirection);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(url, {
                params: {
                    page: currentPage,
                    per_page: perPage,
                    search: searchQuery,
                    order_column: orderColumn,
                    order_direction: orderDirection,
                },
            });
            setData(response.data.data.data.data);
            setTotalRecords(response.data.data.recordsTotal);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [url, currentPage, searchQuery, orderColumn, orderDirection]);

    useEffect(() => {
        if (searchQuery !== prevSearchQuery.current || orderColumn !== prevOrderColumn.current || orderDirection !== prevOrderDirection.current) {
            setCurrentPage(1);
        }

        fetchData();

        prevSearchQuery.current = searchQuery;
        prevOrderColumn.current = orderColumn;
        prevOrderDirection.current = orderDirection;
    }, [fetchData, searchQuery, orderColumn, orderDirection]);

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    const handleSort = useCallback((column, direction) => {
        setOrderColumn(column);
        setOrderDirection(direction);
    }, []);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    return {
        data,
        loading,
        totalRecords,
        currentPage,
        perPage,
        searchQuery,
        orderColumn,
        orderDirection,
        handleSearch,
        handleSort,
        handlePageChange,
        refreshData: fetchData,
    };
};
