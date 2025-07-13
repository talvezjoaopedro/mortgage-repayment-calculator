import Image from "next/image"
import empty from '../../assets/images/illustration-empty.svg'

const Display = props => {
  const labelStyles = "mt-0.5 text-sm text-neutral-600 leading-none";

  return (
    <>
      <div className="hidden flex flex-col items-center justify-center text-center h-full leading-none">
        <Image src={empty} width={240} height={240} alt="empty"/>
      </div>
      <div className="flex flex-col items-center justify-center text-center h-full">
        <div>
          <h1 className="text-4xl">{props.monthly}</h1>
          <p className={labelStyles}>Your monthly repayments</p>
        </div>
        <div className="mt-6">
          <h4 className="text-lg">{props.total}</h4>
          <p className={labelStyles}>Total repayment</p>
        </div>
      </div>
      <div className="hidden flex flex-col items-center justify-center text-center h-full">
        <div className="">
          <h1 className="text-3xl">{props.interest}</h1>
          <p className={labelStyles}>Your monthly interest payment</p>
        </div>
        <div className="mt-6">
          <h4 className="text-lg">{props.totalInterest}</h4>
          <p className={labelStyles}>Total interests</p>
        </div>
      </div>
    </>
  )
}

Display.propTypes = {

}

export default Display
