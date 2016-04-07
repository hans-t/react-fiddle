// Form and input validation


NodeList.prototype.forEach = Array.prototype.forEach;


class InputSet extends React.Component {
    render() {
        return (
            <div>
                <input type="text" name="firstName" defaultValue={this.props.firstName} required/>
                <input type="text" name="lastName" defaultValue={this.props.lastName} required/>
            </div>
        );
    }
}


class FormWithValidation extends React.Component {
    constructor(props) {
        super(props);
        this.fields = ['firstName', 'lastName'];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {values: []};
    }

    handleSubmit(event) {
        event.preventDefault();
        let childNodes = Array.prototype.slice.call(event.target.querySelectorAll('div'));
        const values = childNodes.map((div, index) => {
            const value = {id: index};
            div.childNodes.forEach((input) => {
                value[input.name] = input.value
            })
            return value;
        });
        this.setState({values: values});
    }

    render() {
        console.log(this.state.values);
        return (
            <div>
                <form action="" onSubmit={this.handleSubmit} >
                    {this.props.defaultInputValues.map((obj, index) => {
                        return <InputSet {...obj} key={index} />
                    })}
                    <input type="submit" value="Save"/>
                </form>

                {/* Results */}
                <table>
                    <tbody>
                        {this.state.values.map((value) => {
                            return (
                                <tr key={value.id}>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const defaultInputValues = [
    {firstName: "", lastName: "Duck"},
    {firstName: "Bill", lastName: "Williams"}
]
ReactDOM.render(<FormWithValidation defaultInputValues={defaultInputValues}/>, document.getElementById('container'))