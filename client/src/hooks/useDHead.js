import { useEffect, useState } from "react"

const useDHead = email => {
    const [isDHead, setIsDHead] = useState(false);
    const [isDHeadLoading, setIsDHeadAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/dhead/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsDHead(data.isDHead);
                    setIsDHeadAdminLoading(false);
                })
        }
    }, [email])
    return [isDHead, isDHeadLoading]
}

export default useDHead;