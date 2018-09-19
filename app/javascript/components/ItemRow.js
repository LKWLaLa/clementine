import React from 'react'

class ItemRow extends React.Component {
	render() {
		const id = this.props.itemId
    const item = this.props.item
    const limitingItems = this.props.limitingItems
		const className = this.props.enabled ? 'enabled-row-entry' : 'disabled-row-entry'
		const nameSpan = <span className={className}>{item[id].name}</span>
		const priceSpan = <span className={className}>{item[id].currentPrice}</span>
    const limitingItemDivs = limitingItems ? [...limitingItems].map(i => {
        let limitingItem = item[i]
        return <div key = {i}>{limitingItem.name}</div>
      }) : []
   
    const nameDiv = this.props.enabled ? nameSpan :
              (<div className="tooltip">
                {nameSpan}
                <div className="tooltiptext">
                  {this.props.message}
                  {limitingItemDivs}
                </div>
              </div>)

		return (
  			<tr>
        	<td>
  					<input 
  						type = "checkbox"
  						disabled = {!this.props.enabled}
  						checked = {this.props.selected}
  						onChange = {this.props.handleSelection}
  						id = {id}
  					/>
    		   </td>
  				<td>{nameDiv}</td>
  				<td>{priceSpan}</td>
      </tr> 
		)
	}
}

export default ItemRow