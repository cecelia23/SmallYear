import React from 'react';

class Check extends React.Component {
    render () {
        return (
            <Title title="after adding the title"/>
        )
    }
}

const Title = (props) => 
    <h2>the Title: { props.title }</h2>

Title.propTypes = {
    title(props, propName,component) {
        // 验证是否为空
        if (!(propName in props)) {
            return new Error(`missing ${propName}`)
        }
        // 验证属性值的长度
        if (props[propName].length < 6) {
            return new Error(`the ${propName} is too short.`)
        }
    }
}

export default Check