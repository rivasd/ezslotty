import React, {Component} from 'react'
import './App.css'

import SlotMachine from 'jquery-slotmachine/lib/slot-machine'

class Bandit extends Component{

    constructor(props) {
        super(props);
        this.slots = [];
        this.machines = [];
        this.counter = 0;
        this.spin = this.spin.bind(this);
    }
    
    spin(){
        this.counter = this.props.icons.length;
        this.machines.map((machine, idx) => {
            machine.shuffle(9999);
        });
    }

    render() {

        var iconstyle= {
            height: "100px",
            width:"100%",
            align: "middle"
        }

        var btnstyle= {
            display: "block",
            margin: "auto"
        };

        return (
            <div>
                <div className="bandit">
                    <div className="bandit-display">
                        {this.props.icons.map( (icongroup, i) => 
                            
                            <div key={"scroll-"+i} className="slotMachine" ref={(instance) =>this.slots[i] = instance}>
                                {icongroup.map( (icon, idx) => <img className="slot" key={"icon"+idx} src={"img/"+icon} style={iconstyle} />)}
                            </div>
                        )}
                    </div>
                    
                </div>
                <button onClick={this.spin} style={btnstyle}>Spin moi ça!</button>
            </div> )
    }

    componentDidMount(){
        
        this.slots.map( (ref, i) => {
            var machine = new SlotMachine(ref, {
                active: i,
                delay:500
            })
            this.machines.push(machine)
        })
    }
}

export default Bandit