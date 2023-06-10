import React from 'react'
import { Typography } from 'antd'

function Popular() {
    const { Title } = Typography
    return (
        <aside className='popular'>
            <Title level={2}>Popular</Title>
        </aside>
    )
}

export default Popular