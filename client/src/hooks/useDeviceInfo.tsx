import { useEffect, useState } from "react";
import { isMobile, isTablet, isDesktop, browserName, osName } from "react-device-detect";
import { getIpAddress } from "../utils/helper";

interface DeviceInfo {
  device_name: string;
  ip: string;
}

const useDeviceInfo = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    device_name: "Unknown Device",
    ip: "",
  });

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        // Detect device type
        let deviceType = "Unknown";
        if (isMobile) deviceType = "Mobile";
        else if (isTablet) deviceType = "Tablet";
        else if (isDesktop) deviceType = "Desktop";

        const device_name = `${osName} ${deviceType} (${browserName})`;

        // Get public IP
        const ip = await getIpAddress();
        setDeviceInfo({ device_name, ip });
      } catch (error) {
        console.error("Failed to fetch device info:", error);
      }
    };

    fetchDeviceInfo();
  }, []);

  return deviceInfo;
};

export default useDeviceInfo;
