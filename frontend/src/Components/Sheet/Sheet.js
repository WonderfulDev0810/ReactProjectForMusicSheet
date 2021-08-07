
import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from "react-router-dom";

import { Document, pdfjs, Page } from 'react-pdf'

import SideBar from '../Navbar/SideBar'
import './Sheet.css'

import axios from 'axios'

/* Activate global worker for displaying the pdf properly */
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function Sheet() {
	let { sheetName, composerName } = useParams();
	const [pdf, setpdf] = useState(undefined)

	useEffect(() => {
		if (pdf == undefined) {
			axios.get(`http://localhost:8080/sheet/pdf/${composerName}/${sheetName}`, {responseType: "arraybuffer"})
			.then(res => {
				setpdf(res)
			})
		}	
		
  	});

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset) {
		setPageNumber(prevPageNumber => prevPageNumber + offset);
	}

	function previousPage(e) {
		e.target.blur()
		changePage(-1);
	}

	function nextPage(e) {
		e.target.blur()
		changePage(1);
	} 


	return (
		 <Fragment>
			<SideBar />
			<div className="home_content">
				<div className="document_container">
					<div>
						<div className="doc_header">
							<span className="doc_sheet">{sheetName}</span>
							<br />
							<span className="doc_composer">{composerName}</span>
						</div>

						<div className="noselect document">
							<Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}> 
								<Page pageNumber={pageNumber} width={430}/>
								<div className="page_controls">
									<button type="button" disabled={pageNumber == 1} onClick={previousPage}>&lt;</button>
									<span>
										{pageNumber} of {numPages}
									</span>
									<button type="button" disabled={pageNumber == numPages} onClick={nextPage}>
										&gt;
									</button>
								</div>
							</Document>
						</div>	
					</div>	

					<div className="right_side_doc">
						<div className="doc_box sheet_info">
							<span className="sheet_info_header">Nocturné 1 - Rosenblatt</span>
							<div>
								<span className="bold sheet_info_info">Release Date:</span> 
								<span className="sheet_info_info"> 1999-12-31</span>
							</div>
							<div>
								<span className="bold sheet_info_info">Uploaded At:</span> 
								<span className="sheet_info_info"> 1999-12-31</span>
							</div>
							<div>
								<span className="bold sheet_info_info">Upload By:</span> 
								<span className="sheet_info_info"> vallezw</span>
							</div>
							

							<button className="sheet_info_button">
								Share
							</button>
							<div className="under_box">
								<button className="remove_shadow">
									Download
								</button>
									
								<button className="remove_shadow">
									Edit
								</button>	
							</div>
						</div>	


						<div className="doc_box composer_info remove_shadow">
							<img className="composer_img" src="https://assets.openopus.org/portraits/72753742-1568084874.jpg" alt="image" />
							<div className="composer_info_text_wrapper">
								<span>{composerName}</span>								
								<span>Romantic</span>
							</div>
						</div>

						<div className="video_player">
							<span className="coming_soon">Media Player Coming Soon</span>
							<div>
								<span><a href="/newsletter" target="_blank">Sign up</a> for the newsletter, so you don't miss any updates</span>
							</div>
						</div>				
					</div>											
				</div>
			</div>
		</Fragment>            
	)
}

export default Sheet