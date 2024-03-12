

function weeks() {
    return (
        <div className="ml-[17%] inline-flex flex-col space-y-2 items-start justify-end" style={{ height: 50, }}>
            <div className="inline-flex space-x-16 items-center justify-start" style={{ width: 1731, height: 34, }}>
                <p className="text-[20px] text-darkBlue ">Week 1</p>
                <p className="opacity-50 text-3xl text-green-800">Week 2</p>
                <p className="opacity-50 text-3xl text-green-800">Week 3</p>
            </div>
            <div className="w-36 h-0.5 bg-green-500 border rounded-full" />
        </div>
    )
}

export default weeks