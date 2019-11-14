const e = React.createElement;

class DisplayText extends React.component{

	constructor(props) {
		super(props);

		this.state = {
			display: '${this.props.text}'
		}
		this.onChange = this.onChange.bind(this);
	}

	render() {
		return (
			<p>{this.state.display}</p>
		)
	}
}

export default DisplayText;
const domContainer = document.querySelector('#test_component_container');
reactDom.render(e(DisplayText), domContainer)