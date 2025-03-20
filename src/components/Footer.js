import React from 'react';
import styles from '../styles/Footer.module.css';
import logo from '../assets/Logo Huellitas.png';

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.footerContent}>
                <div className={styles.footerCol}>
                    <img src={logo} alt="Logo Huellitas" className={styles.footerLogo} />
                </div>

                <div className={styles.footerCol}>
                    <h4>Contacto</h4>
                    <ul className={styles.contactInfo}>
                        <li><i className="fas fa-map-marker-alt"></i> Av. Las Mascotas 123, Ciudad Animal</li>
                        <li><i className="fas fa-phone"></i> (123) 456-7890</li>
                        <li><i className="fas fa-envelope"></i> hola@huellitas.com</li>
                    </ul>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>© 2024 Huellitas - Todos los derechos reservados</p>
                <div className={styles.legalLinks}>
                    <a href="/politica-privacidad">Política de privacidad</a>
                    <a href="/terminos-servicio">Términos de servicio</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
