import { memo } from 'react';

import { BsFacebook } from 'react-icons/bs';
import { BsGoogle } from 'react-icons/bs';
import { BsYoutube } from 'react-icons/bs';
import { BsPinMapFill } from 'react-icons/bs';

import classes from "./styles.module.scss";

const Footer = () => {
    return (
        <div className = {classes.footer}>
            <div className = {classes.appName}> FITARE </div>

            <div className = {classes.slogan}> Be strong together! </div>
            <div className = {classes.brandList}>
                <a href='https://www.facebook.com/profile.php?id=100057375273139' target = '_blank'> 
                    <BsFacebook /> 
                </a>
                
                <a href="mailto:lnthuy20@clc.fitus.edu.vn">
                    <BsGoogle />
                </a>
               
                <a href='https://www.youtube.com/playlist?list=PLN-sFqwWKwg8UtKBzqApy6MG5rMZ7_75-' target = '_blank'> 
                    <BsYoutube /> 
                </a>

                <a href='https://www.google.com/maps/place/Saigon+Zoo+and+Botanical+Garden/@10.7905024,106.6860544,12z/data=!4m5!3m4!1s0x31752f4b3330bcc7:0x4db964d76bf6e18e!8m2!3d10.7875481!4d106.7052913' target = '_blank'> 
                    <BsPinMapFill /> 
                </a> 
                
            </div>

            <div className = {classes.line}> </div>

            <div className = {classes.references}>
                <div> WORK </div>
                <div> NEWS </div>
                <div> AWARDS </div>
                <div> LEGAL INFO </div>
                <div> USE INSTRUCTION </div>
                <div> PERSPECTIVE </div>
            </div>

            <div className = {classes.rights}> All rights are reserved by Fitare team </div>
        </div>
    )
}

export default Footer;