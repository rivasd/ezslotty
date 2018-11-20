import React, {Component} from 'react'
import './App.css'

import SlotMachine from 'jquery-slotmachine/lib/slot-machine'

class Bandit extends Component{

    constructor(props) {
        super(props);
        this.slots = [];
    }
    

    render() {

        var iconstyle= {
            height: "100px",
            width:"100%",
            align: "middle"
        }

        return (<div className="bandit">
            <div className="bandit-display">
            {this.props.icons.map( (icongroup, i) => 
                
                <div key={"scroll-"+i} className="slotMachine" ref={(instance) =>this.slots[i] = instance}>
                    {icongroup.map( (icon, idx) => <img className="slot" key={"icon"+idx} src={"img/"+icon} style={iconstyle} />)}
                </div>
            )}
            </div>
        </div> )
    }

    componentDidMount(){
        this.slots.map( (ref) => {
            var machine = new SlotMachine(ref, {
                active: 1,
                delay:500
            })
        })
    }
}

export default Bandit