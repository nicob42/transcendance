import { Avatar, AvatarGroup, Badge, styled } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './FO.module.css'
import axios from 'axios';
import { User } from '../../../../transcendence_backend/src/user/user.entity';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

export const FriendsOnline = () => {

    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>('http://localhost:4000/user', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };

    fetchUser();
  }, []);

  const [state, setState] = React.useState({
    right: false,
  });
  
  return (
    <div className={styles.channel}>
                <div className={styles.channel_photo}>
                <AvatarGroup max={4}>
                  <Avatar alt="Remy Sharp" src="" style={{cursor:'pointer'}}/>
                  <Avatar alt="Travis Howard" src="" style={{cursor:'pointer'}}/>
                  <Avatar alt="Cindy Baker" src="" style={{cursor:'pointer'}}/>
                  <Avatar alt="Agnes Walker" src="" style={{cursor:'pointer'}}/>
                  <Avatar alt="Trevor Henderson" src="" style={{cursor:'pointer'}}/>
                </AvatarGroup>
                </div>
                <div className={styles.channel_text}>
                    <h3>Friends Online</h3>
                </div>
                <div className={styles.channel_profil}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  variant="dot"
                  >
                  <Link href="/profil">
                  <Avatar alt="Remy Sharp" src={user?.imageUrl} style={{cursor:'pointer'}}/>
                  </Link>
                </StyledBadge>
                </div>  
            </div>
  )
}
