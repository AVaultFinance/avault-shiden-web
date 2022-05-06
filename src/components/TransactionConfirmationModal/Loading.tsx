import styled from 'styled-components';

// const Loading01 = ({ isLoading, success }: { isLoading: boolean; success?: boolean }) => {
//   const ref01 = useRef<HTMLDivElement>(null);
//   const ref02 = useRef<HTMLDivElement>(null);
//   const [showRef02, setShowRef02] = useState(false);
//   const animation01 = useRef<AnimationItem>(null);
//   const animation02 = useRef<AnimationItem>(null);
//   useEffect(() => {
//     if (isLoading) {
//       if (animation01.current) {
//         animation01.current.destroy();
//       }
//       animation01.current = lottie.loadAnimation({
//         container: ref01.current,
//         renderer: 'svg' as any,
//         loop: true,
//         autoplay: true,
//         path: '/media/loading01.json',
//       });
//       if (animation02.current) {
//         animation02.current.destroy();
//       }
//       animation02.current = lottie.loadAnimation({
//         container: ref02.current,
//         renderer: 'svg' as any,
//         loop: false,
//         autoplay: false,
//         path: '/media/loading02.json',
//       });
//       animation02.current.stop();
//       setShowRef02(false);
//       if (!success) {
//         animation02.current.destroy();
//         animation01.current.destroy();
//         setShowRef02(false);
//       }
//       return () => {
//         if (animation01.current) {
//           animation01.current.destroy();
//         }
//         if (animation02.current && success) {
//           setShowRef02(true);
//           animation02.current.play();
//           setTimeout(() => {
//             animation02.current.destroy();
//             setShowRef02(false);
//           }, 1500);
//         }
//       };
//     }
//   }, [isLoading, success]);
//   return (
//     <>
//       <Wrap ref={ref01} show={isLoading}></Wrap>
//       <Wrap ref={ref02} show={showRef02}></Wrap>
//     </>
//   );
// };

const Loading = ({ isLoading, success }: { isLoading: boolean; success?: boolean }) => {
  return (
    <Wrap show={isLoading}>
      <svg viewBox="0 0 50 50" xmlSpace="preserve">
        <path
          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
          transform="rotate(275.098 25 25)"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          ></animateTransform>
        </path>
      </svg>
    </Wrap>
  );
};
const Wrap = styled.div<{ show: boolean }>`
  width: 22px;
  margin-left: 4px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;
export default Loading;
