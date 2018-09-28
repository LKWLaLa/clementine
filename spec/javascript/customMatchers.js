import expect from 'expect'
import {Record, RecordCollection} from '../../app/javascript/kinship/Kinship.js'

function subset(a,b,has = 'has') {
	for (let i of a) {
		if (!b[has](i)) return false
	}
	return true
}

function setEquals(a,b,has = 'has') {
	return subset(a,b,has) && subset(b,a,has)
}

expect.extend({
	hasExactly(received,expected) {
		const pass = setEquals(received,expected,'has')

		const message = pass
	      ? () =>
	          this.utils.matcherHint('.not.hasExactly') +
	          '\n\n' +
	          `Expected value not to have exactly:\n` +
	          `  ${this.utils.printExpected(expected)}\n` +
	          `Received:\n` +
	          `  ${this.utils.printReceived(received)}`
	      : () => 
            this.utils.matcherHint('.hasExactly') +
            '\n\n' +
            `Expected value to have exactly:\n` +
            `  ${this.utils.printExpected(expected)}\n` +
            `Received:\n` +
            `  ${this.utils.printReceived(received)}`

		return {pass, message}
	}
})

expect.extend({
	includesExactly(received,expected){
		const pass = setEquals(received,expected,'includes')

		const message = pass
	      ? () =>
	          this.utils.matcherHint('.not.includesExactly') +
	          '\n\n' +
	          `Expected value not to include exactly:\n` +
	          `  ${this.utils.printExpected(expected)}\n` +
	          `Received:\n` +
	          `  ${this.utils.printReceived(received)}`
	      : () => 
            this.utils.matcherHint('.includesExactly') +
            '\n\n' +
            `Expected value to include exactly:\n` +
            `  ${this.utils.printExpected(expected)}\n` +
            `Received:\n` +
            `  ${this.utils.printReceived(received)}`
            
		return {pass, message}
	}
})

expect.extend({
	rcEquals(x,y) {
		return {
			pass:  x.equals(y),
			message: ''	
		}
	}
})

export default expect
