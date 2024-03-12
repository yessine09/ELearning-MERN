
type sectionProps = {
    num: string,
    title: string,
    description: string,
    style?: React.CSSProperties
}
export default function ActiveSection({ num, title, description, style }: sectionProps) {
    return (
        <div className="flex items-center font-font ">
            <div className="rounded"
                style={{ fontFamily: 'Segoe UI', fontWeight: 'bold', color: '#05445E', height: '50px', width: '50px', textAlign: 'center', padding: '10px', fontSize: '20px', border: '2px solid #FFCC29', backgroundColor: '#FFCC29' }} >{num}</div>
            <div className=" text-darkBlue pl-[35px]" style={style}>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }} >{title}</div>
                <div style={{ fontWeight: 'regulat', fontSize: '14px' }}>{description}</div>
            </div>
        </div>
    )
}
