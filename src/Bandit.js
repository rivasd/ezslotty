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
        this.stop = this.stop.bind(this);
    }
    
    spin(){
        this.counter = this.props.icons.length;
        this.machines.map((machine, idx) => {
            machine.shuffle(9999999);
        });
    }

    stop(){
        if (this.counter > 0){
            this.machines[this.counter-1].stop();
            this.counter--;
        }
    }

    render() {

        

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
                                {icongroup.map( (icon, idx) => <div className="slot" key={"icon"+idx} style={{backgroundImage:"url('img/"+icon+"')"}}></div>)}
                            </div>
                        )}
                    </div>
                    
                </div>
                <div style={btnstyle}>
                    <button onClick={this.spin} >Spin moi ça!</button>
                    <button onClick={this.stop}> Wo de Wo!</button>
                </div>
                
            </div> )
    }

    componentDidMount(){
        
        this.slots.map( (ref, i) => {
            var machine = new SlotMachine(ref, {
                active: i,
                delay:500
            });
            this.machines.push(machine)
        });
    }
}

export default Bandit