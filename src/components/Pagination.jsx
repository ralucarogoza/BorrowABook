import React from 'react'
import styles from './Pagination.module.css'

const Pagination = ({ numberOfPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1)
    const goToNextPage = () => {
            if(currentPage !== numberOfPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <div className={styles.center}>
        <div className={styles.pagination}>
        <a
            className={`${styles.paginationlink} ${styles.paginationitem}`}
            onClick={goToPrevPage}
            href="#"
        >
            &laquo;
        </a>
        {pageNumbers.map((pgNumber) => (
            <a
                key={pgNumber}
                onClick={() => setCurrentPage(pgNumber)}
                className={`${styles.paginationlink} ${styles.paginationitem} ${currentPage === pgNumber ? styles.active : ''}`}
                href="#"
            >
                {pgNumber}
            </a>
        ))}
        <a
            className={`${styles.paginationlink} ${styles.paginationitem}`}
            onClick={goToNextPage}
            href="#"
        >
            &raquo;
        </a>
    </div>
    </div>
    )
    }
export default Pagination;
