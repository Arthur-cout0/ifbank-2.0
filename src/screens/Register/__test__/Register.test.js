import { render } from '@testing-library/react-native';
import Register from '../Register';

describe('Register', () => {
    test('teste para saber se o componente renderizou', () => {
        render(<Register></Register>)
    })
})