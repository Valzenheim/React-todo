import React from "react";
import uuid from 'react-uuid'

class ReactToDo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            taskValues: [],
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }



    changeHandler(event) {
        this.setState({value: event.target.value});
    }

    inputHandler(event) {
        event.preventDefault();
        this.setState({value:''})
        this.state.taskValues.push({
            taskValue: this.state.value,
            itemChecked: ''
        })
        console.log(this.state)
    }

    checkedHandler(event){
        let target = event.target;
        target.checked ?
            target.nextSibling.style.textDecoration = 'line-through' :
            target.nextSibling.style.textDecoration = 'none'

    }

    completedRemover(){

    }

    anyoneSelector(event){
        // event.target.checked ?
        //     this.state.taskValues.map((item) => item.itemChecked = true) :
        //     this.state.taskValues.map((item) => item.itemChecked = false)
    }

    render() {
        return (
            <div className="App">
                <form className="appForm"  onSubmit={this.inputHandler}>
                    <ul>
                        {this.state.taskValues.map((item)=>
                            <li key ={uuid()}>
                                <input type="checkbox" className="checks" onChange={this.checkedHandler}/>
                                <span>
                                   {item.taskValue}
                               </span>
                            </li>
                        )}
                    </ul>
                    <input type="checkbox" onClick={this.anyoneSelector}/>
                    <input type="text" value={this.state.value} onChange={this.changeHandler} />
                    <button type="submit"/>
                </form>
            </div>
        );
    }
}

export default ReactToDo;
