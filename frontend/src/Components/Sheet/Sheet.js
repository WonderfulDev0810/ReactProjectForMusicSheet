// TODO: seperate imports properly

import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';

import { useParams } from "react-router-dom";

import { Document, pdfjs, Page } from 'react-pdf'

import SideBar from '../Navbar/SideBar'

import axios from 'axios'

import './Sheet.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



function Sheet() {
	let { sheetName } = useParams();

	const [pdf, setpdf] = useState(undefined)

	useEffect(() => {
		if (pdf == undefined) {
			axios.get("http://localhost:8080/sheet/pdf/Frédéric Chopin/Chopin étude 1", {responseType: "arraybuffer"})
			.then(res => {
				var uint8View = new Uint8Array(res.data)
				let obj = {data: uint8View}
				setpdf(res)
				console.log(res);
			})
		}	
		
  	});

	  
	return (
		 <Fragment>
			<SideBar />
			
			<div className="home_content">
				<div className="document_container">
					<Document file={pdf} height={20}> 
						<Page pageNumber={1} width={450}/>
					</Document>
				</div>
			</div>
		</Fragment>            
	)

}

export default Sheet

