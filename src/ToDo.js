import React from "react";
import uuid from 'react-uuid'
import "./style.css"

class ReactToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            taskValues: [],
            activeItems: [],
            filterItems:[],
            filter: 'all'
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.checkedHandler = this.checkedHandler.bind(this)
        this.allSelector = this.allSelector.bind(this)
        this.itemRemover = this.itemRemover.bind(this)
        this.completedRemover = this.completedRemover.bind(this)
        this.completeCounter = this.completeCounter.bind(this)
    }

    changeHandler(event) {

        this.setState({value: event.target.value});
    }

    inputHandler(event) {
        // if (!/[0-9a-zA-Zа-яёА-ЯЁ]/i.test(this.state.value)) {
        //     this.completeCounter()
        //     this.filteredItems()
        //     return false
        // }else {
            let inputText = this.state.taskValues
            event.preventDefault();
            inputText.push({
                taskValue: this.state.value,
                id: uuid(),
                checks: false,
            })
            this.setState({taskValues: inputText});
            this.setState({value: ''});
            this.completeCounter()
            this.filteredItems()
        }

    checkedHandler(event) {
        const target = event.target;
        let oldTasks = this.state.taskValues;
        oldTasks.map((item) =>
            item.id === target.id ?
                item.checks = !item.checks :
                null
        )
        this.setState({taskValues: oldTasks});
        this.completeCounter()

    }

    completedRemover() {
        let oldTask = this.state.taskValues
        const newTask = oldTask.map((item, index) =>
            item.checks ? null : item
        ).filter(x => x)
        console.log(newTask);
        document.getElementById('allComp').checked = false
        this.setState({taskValues: newTask}, this.filteredItems)
        this.completeCounter()

    }

    itemRemover(event) {
        let oldTasks = this.state.taskValues
        let elem = event.target.parentNode.id
        oldTasks.map((item, index) =>
            item.id === elem ?
                oldTasks.splice(index, 1) :
                null
        )
        this.setState({taskValues: oldTasks}, this.filteredItems)
        this.completeCounter()
    }

    allSelector(event) {
        let oldTasks = this.state.taskValues;
        oldTasks.map((item) =>
            item.checks = event.target.checked
        )
        this.setState({taskValues: oldTasks}, this.filteredItems)
        this.completeCounter()

    }

    completeCounter() {
        let oldTasks = this.state.taskValues
        let activeTasks = this.state.activeItems
        activeTasks.splice(0, activeTasks.length)
        oldTasks.map((item,index)=>
            item.checks ? null : activeTasks.push(item)
        )
        this.setState({activeItems: activeTasks})

    }

    itemFilter(e){
        let filterState = e.currentTarget.dataset.value
        e.preventDefault()
        this.setState({filter: filterState}, this.filteredItems)}

    filteredItems(){
        let oldTasks = this.state.taskValues
        let filt = this.state.filter
        if(filt === 'all'){
            this.setState({filterItems: oldTasks})
        }else if(filt === 'active'){
            let newTasks = oldTasks.map((item)=>item.checks ? null : item).filter(x => x)
            this.setState({filterItems: newTasks})
        }else if (filt === 'done'){
            let newTasks = oldTasks.map((item)=>item.checks ? item : null).filter(x => x)
            this.setState({filterItems: newTasks})
        }
    }

    render() {
        return (
            <div className="App">
                <div className="header">
                    <form className="appForm" onSubmit={this.inputHandler}>
                        <input type="text" className="formInput" placeholder="Enter your task name here" value={this.state.value} onChange={this.changeHandler}/>
                    </form>
                </div>
                    <div className="section">
                        { this.state.filterItems.map((item) =>
                                <div key={uuid()}  className={item.checks ? 'completed' : 'active'} id={item.id}>
                                    <input type="checkbox" id={item.id} checked={item.checks} onChange={this.checkedHandler}/>
                                    <span className="textArea">
                                        {item.taskValue}
                                    </span>

                                    <span className="remSpan" onClick={this.itemRemover}>
                                        ❌
                                    </span>
                                </div>
                        )}
                    </div>
                <div className="footer">
                    <input type="checkbox" id="allComp" onChange={this.allSelector}/>
                    <span>
                        {this.state.activeItems.length}/{this.state.taskValues.length}tasks left
                    </span>

                    <button className={this.state.filter === 'all' ? 'activeBtn' : ''}
                            data-value = 'all'
                            onClick={this.itemFilter.bind(this)}>all</button>

                    <button className={this.state.filter === 'active' ? 'activeBtn' : ''}
                            data-value = 'active'
                            onClick={this.itemFilter.bind(this)}>active</button>

                    <button className={this.state.filter === 'done' ? 'activeBtn' : ''}
                            data-value = 'done'
                            onClick={this.itemFilter.bind(this)}>done</button>

                    <button onClick={this.completedRemover}>
                        remove completed
                    </button>
                </div>
            </div>
        );
    }
}

export default ReactToDo;
