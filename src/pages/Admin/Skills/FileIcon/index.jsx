import React, { useState } from 'react';
import scss from './style.module.scss';
import { imageSetter } from '@/scripts';

const FileIcon = ({ editMode = false, icon, setIcon, required = false }) => {
	const changeFile = e => imageSetter(e, setIcon);


	return (<>
		<label className={scss.fileIcon} style={{ pointerEvents: !editMode ? 'none' : 'auto' }} >
			<input required={required} readOnly={!editMode} type="file" accept=".svg" name='icon' onChange={changeFile} />
			<img src={icon} data-edit={editMode} />
		</label>
	</>)
}

export default FileIcon;