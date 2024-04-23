import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@hooks/index';
import { loginAction } from '@store/thunks/auth';

type TFormInput = {
  email: string;
  password: string;
}

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<TFormInput>();

  const onSubmit = ((loginData: TFormInput) => {
    dispatch(loginAction(loginData));
  });

  return (
    <form
      className="login-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(onSubmit)(evt);
      }}
    >
      <div className="login-form__inner-wrapper">
        <h1 className="title title--size-s login-form__title">Вход</h1>
        <div className="login-form__inputs">
          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="email">E&nbsp;–&nbsp;mail</label>
            <input
              type="email"
              id="email"
              placeholder="Адрес электронной почты"
              {...register('email', {
                required: 'Поле обязательно для заполнени',
              })}
            />
            {errors.email && <span role="alert">{errors.email.message}</span>}
          </div>
          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              placeholder="Пароль"
              {...register('password', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 3,
                  message: 'Пароль должен быть не менее 3 символов'
                },
                maxLength: {
                  value: 15,
                  message: 'Пароль должен быть не более 15 символов'
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,15}$/,
                  message: 'Пароль должен содержать минимум одну букву, одну цифру и быть от 3 до 15 символов'
                }
              })}
            />
            {errors.password && <span role="alert">{errors.password.message}</span>}
          </div>
        </div>
        <button className="btn btn--accent btn--general login-form__submit" type="submit">Войти</button>
      </div>
      <label className="custom-checkbox login-form__checkbox">
        <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
        <span className="custom-checkbox__icon">
          <svg width={20} height={17} aria-hidden="true">
            <use xlinkHref="#icon-tick" />
          </svg>
        </span>
        <span className="custom-checkbox__label">Я&nbsp;согласен с
          <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

export default LoginForm;
