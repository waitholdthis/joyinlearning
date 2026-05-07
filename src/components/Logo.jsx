export default function Logo() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/joyinlearning-logo.png`}
      alt="Joy in Learning Discovery Center"
      style={{ height: '52px', width: 'auto', display: 'block' }}
    />
  );
}
