import React from 'react';


export class Square extends React.Component {
    constructor(props) {
        /*
          this is constructor is called once even
          when the prop value changes
        */
        super(props);
        this.state = {
            value: null,
        };
        this.value = null;
    }

    render() {
        /*
          Never change the state in render because render depends
          on the state making this an never ending recursive function

          if(this.props.value)
              this.setState({value: this.props.value});
        */
        var value;
        if(this.props.onClick)
            value = this.props.value;
        else
            value = this.state.value;
        this.value = value;
        return (
            <button className="square"
                    onClick={this.onClick.bind(this)}
                    style={{backgroundColor: this.props.color}}>
              {value}
            </button>
        );
    }

    /* set the square state on the click event */
    onClick(event) {
        if(this.props.onClick) {
            /* delegate state change to the upper component in this case Board */
            this.props.onClick(event);
            console.log("Delegate onClick");
        }
        else {
            /* default state change */
            this.setState({value: 'X'});
        }
        console.log('Square Clicked: ' + this.props.ID);
    }
}
