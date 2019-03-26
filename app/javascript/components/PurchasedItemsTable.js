import React from 'react'

class PurchasedItemsTable extends React.Component {
	render() {
		const purchasedItems = this.props.purchasedItems
		const title = this.props.title
		const msg = this.props.msg
		const rows = purchasedItems.size > 0 ?
			[...purchasedItems].map(item => (
				<tr className="item-row" key={item.id}>
					<div className="item-description">{item.name}<br /> 
						<div className="description">{item.description}</div>
					</div>
				</tr>)) :
			<tr><td>{msg}</td></tr>
		return (
			<table className="items-table">
				<thead>
					<tr>
					<th colSpan="1" className="category-header">{title}</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}	
}

export default PurchasedItemsTable