import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxilary from '../Auxilary/Auxilary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount(){
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(resp=> resp,error => {
                this.setState({error: error});                
            });
        }
        errorConfirmedHanlder = () => {
            this.setState({error: null});
        }
        render(){
            return (
                <Auxilary>
                    <Modal show={this.state.error} closed={this.errorConfirmedHanlder}>
                        {this.state.error ? this.state.error.message : ''}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilary>
            );
        }
    }
}

export default withErrorHandler;