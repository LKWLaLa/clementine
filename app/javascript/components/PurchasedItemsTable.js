import React from 'react'

class PurchasedItemsTable extends React.Component {
	render() {
		const purchasedItems = this.props.purchasedItems
		const rows = purchasedItems.size > 0 ?
			[...purchasedItems].map(item => (
				<tr className="item-row" key={item.id}>
					<div className="item-description">{item.name}<br /> 
						<div className="description">{item.description}</div>
					</div>
				</tr>)) :
			<tr><td>You have not purchased any items yet</td></tr>
		return (
			<table className="items-table">
				<thead>
					<tr>
					<th colSpan="1" className="category-header">Your Purchased Items</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}	
}

export default PurchasedItemsTable