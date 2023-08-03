import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width={155}
        height={205}
        viewBox="0 0 155 205"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="175" rx="5" ry="5" width="80" height="25" />
        <rect x="118" y="168" rx="10" ry="10" width="35" height="35" />
        <rect x="0" y="15" rx="10" ry="10" width="150" height="90" />
        <rect x="0" y="120" rx="5" ry="5" width="150" height="15" />
        <rect x="0" y="140" rx="5" ry="5" width="95" height="15" />
    </ContentLoader>
)

export default Skeleton

