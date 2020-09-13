import React from 'react'
import './style.css'
import StylizedCircle from '../stylized-circle';

const Pagination = (props: any) => {

    const pages = props.totalPages;
    const currentPage = props.currentPage;
    const changePage = props.changePage;

    const schema = (pages: number) => {
        let pag = [];
        for (let index = 1; index <= pages; index++) {
            if((index) === currentPage) {
                pag.push(
                    <div className="page-index" key={index}>
                        <StylizedCircle data={index} size={48}/>
                    </div>
                )    
            }else {
                pag.push(
                    <div 
                    key={index}
                    className="page-index-unselected page-index"
                    onClick={() => changePage(index)}
                    >
                        <span>{index}</span>
                    </div>
                )
            }
        }
        return pag;
    }
    let pageNumbers = schema(pages);
    return(
        <footer>
            <div className="pagination-wrapper">
                {
                pageNumbers.map(elem => elem)
                }
            </div>
        </footer>
    )
}

export default Pagination