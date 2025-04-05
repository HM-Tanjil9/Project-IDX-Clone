import usePing from "../../hooks/apis/queries/usePing.js";

export const PingComponent = () => {
    const { isLoading, data } = usePing();
    if(isLoading) {
        return(
            <>Please wait...</>
        )
    }
    return (
        <>
            Hello {data.message}
        </>
    )
}