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
		this.submitExchanges = this.submitExchanges.bind(this)

		this.state = {
			showExchangesTable: false,
			exchangesButtonEnabled: true
		}
	}

	showExchangesTable() {
		this.setState({showExchangesTable: true})
	}

	hideExchangesTable() {
		this.setState({showExchangesTable: false})
	}

	submitExchanges() {
		this.setState({exchangesButtonEnabled: false})
		let exchanges = this.props.exchanges
			.filter((e) => this.props.selectedUpgrades.has(e))

		let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
		
		let data = {
			exchanges : exchanges
		}

		let init = {
			method: 'POST',
			headers: {'Content-Type': 'application/json',
		        'Accept': 'application/json',
		        'X-Requested-With': 'XMLHttpRequest',
		        'X-CSRF-Token': csrfToken
        	},
        	body: JSON.stringify(data), // will this work with getters?
        	credentials: 'same-origin'
		}
		fetch('/api/exchanges',init).then((res,err) =>{
			if (err) {
				msg = `error in call to /api/exchanges: ${err}`
				throw msg
			}
			if (res.ok) {this.props.showTransactionComplete()}
			if (res.error) {this.setState({error: res.error})}
		})
	}

	toEnabled(upgrade) {
		let upgradeToItem = upgrade.upgradeToItem
		let s = this.props.status(upgradeToItem)
		return !(s.ineligible || s.excluded || upgradeToItem.soldOut)
	}

	fromEnabled(upgrade) {
		let upgradeFromItem = upgrade.upgradeFromItem
		return this.props.priorItems.has(upgradeFromItem)
	}

	enabled(upgrade) {
		return this.props.selectedUpgrades.has(upgrade) ||
				(this.toEnabled(upgrade) && this.fromEnabled(upgrade))
	}

	render() {
		const upgrades = this.props.upgrades
		const exchanges = this.props.exchanges
		const selectedUpgrades = this.props.selectedUpgrades
		const handleSelection = this.props.handleSelection

		const upgradesTable = <UpgradesTable 
				upgrades = {upgrades}
				selectedUpgrades = {selectedUpgrades}
				handleSelection = {handleSelection}
				enabled = {this.enabled}
			/>

		const noAvailableUpgradesMessage = <div>You have no upgrades available at this time </div>

		const upgradesElement = this.props.upgrades.size > 0 ?
			upgradesTable : noAvailableUpgradesMessage
			
		const exchangesTable = <ExchangesTable
					exchanges = {exchanges}
					selectedUpgrades = {selectedUpgrades}
					handleSelection = {handleSelection}
					enabled = {this.enabled}
				/>

		const exchangesButton = this.state.exchangesButtonEnabled ?
			<button onClick={this.submitExchanges}>Confirm Exchange</button> :
			<span>Submitting Exchange...</span>

		const exchangesElement = this.state.showExchangesTable ?
			<div>
				<button onClick={this.hideExchangesTable}>Hide exchanges</button>
				{exchangesTable}
				{exchangesButton}
			</div> :
			<button onClick={this.showExchangesTable}>Sign up for the wrong level or role?  Click here!</button>

		return <div>
			{upgradesElement}
			{this.props.exchanges.length > 0 ? exchangesElement : null}
		</div>
	}
}

export default ConversionsContainer