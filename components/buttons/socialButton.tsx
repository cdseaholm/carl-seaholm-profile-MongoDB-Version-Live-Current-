import { SocialIcon } from 'react-social-icons';
import openInNewTab from '@/components/listeners/OpenInNewTab';

export default function SocialButton({networkName, parent}: {networkName: string; parent: boolean;}) {

    const style = {
        headerIcon: {
            height: 30,
            width: 30,
        },
        icon: {
          height: 35,
          width: 35,
          margin: 5,
          border: '1px solid white',
          borderRadius: '50%',
          alignContent: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        iconClose: {
          height: 2,
          width: 2,
          margin: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          color: 'transparent',
        },
      };

    const networkLink = networkName === 'github' ? 'http://www.github.com/cdseaholm' : 'https://www.linkedin.com/in/carlseaholm/';

return (
    <div className='cursor-pointer' onClick={() => openInNewTab(networkLink)}>
        <SocialIcon style={parent === true ? style.headerIcon : style.icon} network={networkName}/>
    </div>
)

}