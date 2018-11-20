import React, {Component} from 'react'
import './App.css'
import SlotMachine from 'jquery-slotmachine/dist/slotmachine'


class Bandit extends Component{

    

    render() {

       

        return (<div className="bandit">
            <div className="bandit-display">
            {this.props.icons.map( (icongroup, i) => 
                
                <div key={"scroll-"+i} className="slotMachine">
                    {icongroup.map(icon => <div className="slot"><img src={"img/"+icon} style={{align:"middle"}} /></div>)}
                </div>
            )}
            </div>
        </div> )
    }

    componentDidMount(){

    }
}

export default Bandit