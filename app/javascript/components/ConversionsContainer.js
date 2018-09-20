import React from 'react'
import UpgradesTable from './UpgradesTable.js'
import ExchangesTable from './ExchangesTable.js'

class ConversionsContainer extends React.Component {
	constructor(props) {
		super(props)
		this.toEnabled = this.toEnabled.bind(this)
		this.fromEnabled = this.fromEnabled.bind(this)
		this.enabled = this.enabled.bind(this)
		this.showExchangesTable = this.showExchangesTable.bind(this)
		this.hideExchangesTable = this.hideExchangesTable.bind(this)

		this.state = {
			showExchangesTable: false
		}
	}

	showExchangesTable() {
		this.setState({showExchangesTable: true})
	}

	hideExchangesTable() {
		this.setState({showExchangesTable: false})
	}

	toEnabled(upgradeId) {
		let upgradeToItemId = this.props.upgrade[upgradeId].upgradeToItemId
		let s = this.props.status[upgradeToItemId]
		return !(s.ineligible || s.excluded || this.props.item[upgradeToItemId].soldOut)
	}

	fromEnabled(upgradeId) {
		let upgradeFromItemId = this.props.upgrade[upgradeId].upgradeFromItemId
		return this.props.priorItemIds.has(upgradeFromItemId)
	}

	enabled(upgradeId) {
		return this.props.selectedUpgradeIds.has(upgradeId) ||
				(this.toEnabled(upgradeId) && this.fromEnabled(upgradeId))
	}

	render() {
		const upgrades = this.props.upgrades
		const exchanges = this.props.exchanges
		const item = this.props.item
		const selectedUpgradeIds = this.props.selectedUpgradeIds
		const status = this.props.status
		const handleSelection = this.props.handleSelection

		const upgradesTable = <UpgradesTable 
				upgrades = {upgrades}
				item = {item}
				selectedUpgradeIds = {selectedUpgradeIds}
				status = {status}
				handleSelection = {handleSelection}
				enabled = {this.enabled}
			/>

		const noAvailableUpgradesMessage = <div>You have no upgrades available at this time </div>

		const upgradesElement = this.props.upgrades.length > 0 ?
			upgradesTable : noAvailableUpgradesMessage
			
		const exchangesTable = <ExchangesTable
					exchanges = {exchanges}
					item = {item}
					selectedUpgradeIds = {selectedUpgradeIds}
					status = {status}
					handleSelection = {handleSelection}
					enabled = {this.enabled}
				/>

		const exchangesElement = this.state.showExchangesTable ?
			<div>
				<button onClick={this.hideExchangesTable}>Hide exchanges</button>
				{exchangesTable}
			</div> :
			<button onClick={this.showExchangesTable}>Sign up for the wrong level or role?  Click here!</button>

		return <div>
			{upgradesElement}
			{this.props.exchanges.length > 0 ? exchangesElement : null}
		</div>
	}
}

export default ConversionsContainer