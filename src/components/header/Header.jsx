import styles from "../../styles/components/header/header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo}>
        로고
      </a>
      <nav className={styles.gnb}>내용</nav>
    </header>
  );
};

export default Header;
