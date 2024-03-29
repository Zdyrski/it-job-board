import { useNavigate } from 'react-router-dom';
import { MainContainer, MainRow, Logo } from './Navbar.styled';
import { ColorModeToggleButton } from '../Buttons/ThemeButton/ColorModeToggleButton';
import LoggedMenuDropdown from '../Buttons/SignInDropdown/LoggedMenuDropdown';
import FilterBar from '../FilterBar/FilterBar';

interface NavbarInterface {
  filterBar? : boolean
}
// TODO navbar and roles
function Navbar({ filterBar } : NavbarInterface) {
  const navigate = useNavigate();

  return (
    <MainContainer filterBar={filterBar ? 'on' : 'off'}>
      <MainRow filterBar={filterBar ? 'on' : 'off'}>
        <Logo onClick={() => navigate('/')}>IT Job Board</Logo>
        <ColorModeToggleButton />
        <LoggedMenuDropdown />
      </MainRow>
      {filterBar && <FilterBar />}
    </MainContainer>
  );
}

Navbar.defaultProps = {
  filterBar: true,
};

export default Navbar;
