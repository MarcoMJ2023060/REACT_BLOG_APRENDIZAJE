import logo from '../assets/logodb2.png'

export const Logo = ({text}) => {
    return(
        <div className='auth-form-logo-container' style={{ textAlign: 'center' }}>
            <img src={logo} alt='Logo' style={{ width: '200px', height: 'auto' }}/>
            <br></br>
            <span class="login__title">{text}</span>
        </div>
    )
}