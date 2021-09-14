import React from 'react';

Hello.defaultProps = {
    name: '이름없음'
}

function Hello({color, name}) {
    return <div style={{ color }}>안녕하세요 {name}</div>
}

export default Hello;