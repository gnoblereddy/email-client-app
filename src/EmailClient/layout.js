import React from 'react';
import inboxData from '../MockData/inbox .json';
import spamData from '../MockData/spam.json';
import deletedData from '../MockData/delete.json';
import './layout.css';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: inboxData,
            sideNavData: [
                {
                    key: '1',
                    value: 'Inbox',
                    count: 0
                },
                {
                    key: '2',
                    value: 'Spam',
                    count: 0
                },
                {
                    key: '3',
                    value: 'Deleted Items',
                    count: 0
                },
                {
                    key: '4',
                    value: 'Custom Folder',
                    count: 0
                }
            ]
        };
    }

    componentDidMount() {
        const { sideNavData, content } = this.state;
        let header = document.getElementById('sidebar-div');
        let btns = header.getElementsByClassName('btn');
        btns[0].classList.add('active');
        const countLength = content.filter(data => data.unread === true);
        sideNavData[0].count = countLength.length;
        this.setState({ sideNavData })
    }

    renderSideNav = () => {
        const { sideNavData } = this.state;
        let result = [];
        sideNavData.forEach(data => {
            result.push(
                <p className='btn' id={data.key} onClick={() => this.sideBarClick(data.value, data.key)}>{data.value}{data.count > 0 && <span className='count-div'>{data.count}</span>}</p>);
        })
        return result;
    }

    sideBarClick = (item, childId) => {
        let response = this.state.content;
        if (item === 'Inbox') {
            response = inboxData;
        } else if (item === 'Spam') {
            response = spamData;
        } else if (item === 'Deleted Items') {
            response = deletedData;
        } else if (item === 'Custom Folder') {
            response = [];
        }
        let header = document.getElementById('sidebar-div');
        let btns = header.getElementsByClassName('btn');
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove('active');
            if (btns[i].id === childId) {
                btns[i].classList.add('active');
            }
        }
        this.setState({ content: response });
    }

    renderMailDetails = () => {
        const { content } = this.state;
        let result = [];
        if (content.length === 0) {
            result.push(<div className='no-data-div'>
                No Data
            </div>)
        }
        content.forEach(data => {
            result.push(
                <div className='content-div' onClick={() => this.contentClick(data)}>
                    <span className={`email-subject ${data.unread && 'content-active'}`}>{data.subject}</span>
                    <span className='email-content'>{data.content}</span>
                </div>)
        });
        return result;
    }

    contentClick = (value) => {
        const { content, sideNavData } = this.state;
        content.forEach(data => {
            if (data.mId === value.mId) {
                data.unread = false;
            }
        })
        const countLength = content.filter(data => data.unread === true);
        let header = document.getElementById('sidebar-div');
        let btns = header.getElementsByClassName('btn');
        for (let i = 0; i < btns.length; i++) {
            console.log('btns---', btns[i].classList);
            if (btns[i].classList.contains('active')) {
                sideNavData[i].count = countLength.length;
            }
        }
        this.setState({ content, sideNavData });
    }


    render() {
        return (
            <div className='email-client-container'>
                <div className='sticky-header' />
                <div className='body'>
                    <div className='sidebar' id='sidebar-div'>
                        {this.renderSideNav()}
                    </div>
                    <div className='sidebar-content'>
                        {this.renderMailDetails()}
                    </div>
                    <div className='sidebar-content-data'>
                        Select an item to read
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout;