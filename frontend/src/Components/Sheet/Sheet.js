
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

	  
	return (
		 <Fragment>
			<SideBar />
			
			<div className="home_content">
				<div className="noselect">
					<Document file={pdf} height={20}> 
						<Page pageNumber={1} width={450}/>
					</Document>
				</div>
			</div>
		</Fragment>            
	)

}

export default Sheet