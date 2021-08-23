import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router';
import { findComposer } from '../../Utils/utils';

import { connect } from 'react-redux';
import { getSheetPage } from '../../Redux/Actions/dataActions'


import './Composer.css'

import SideBar from '../Sidebar/SideBar'
import SheetBox from '../SheetsPage/Components/SheetBox';

function Composer({ composerPages, getSheetPage }) {
	const { composerName } = useParams();

	const [composer, setComposer] = useState(findComposer(composerName, composerPages))

	const getData = () => {
		const data = {
			page: 1,
			sortBy: "updated_at desc",
			composer: composerName
		}

		getSheetPage(data)
	}

	return (
		<Fragment>
			<SideBar />
			<div className="home_content">
				<div className="composer-page">
					<img src={composer.portrait_url} className="portrait-page" />
					<h5>{composer.name}</h5>
					<h6>{composer.epoch}</h6>
					<ul className="all-sheets-container full-height">					
						{composer.sheets == undefined?
							getData() :
							composer.sheets.map(sheet => {
								return (
									<SheetBox sheet={sheet}/>
								) 
						})}
					</ul>
				</div>
			</div>
		</Fragment>
	)
}

const mapStateToProps = (state) => ({
	composerPages: state.data.composerPages,
})

const mapActionsToProps = {
    getSheetPage
}

export default connect(mapStateToProps, mapActionsToProps)(Composer)
