/**
 * Created by juyoung on 2018-05-17.
 */
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class InfoDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data:  {
                nodes: [],
                links: []
            },
        };
    }

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Discard"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Alert" onClick={this.handleOpen} />
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Discard draft?
                </Dialog>
            </div>
        );
    }
}

export default InfoDialog;