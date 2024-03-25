import React from 'react';

const BreadCrumb = ({ path }) => {
    return (
        <div>
            {/*<span className={style.path}>
                    {currentFolder !== 'root' ?
                        (
                            <ul className={style.breadcrumb}>
                                <button
                                    className={style.breadcrumbItem}
                                    onClick={() => handleNavigate('/dashboard', 'root')}>
                                    Root
                                </button>
                                {currentFolderData?.data.path.map((folder, index) => (
                                    <button
                                        className={style.breadcrumbItem}
                                        key={index}
                                        onClick={() =>
                                            handleNavigate(
                                                `/dashboard/folder/${userFolders.find((fldr) => folder = fldr).folderId}`,
                                                userFolders.find((fldr) => folder = fldr).folderId
                                            )}>
                                        {userFolders.find((fldr) => fldr = folder).data.name}
                                    </button>
                                ))}
                                <li className={style.breadcrumbItem}>
                                    {currentFolderData?.data.name}
                                </li>
                            </ul>
                        ) :
                        (
                            <ul className={style.breadcrumb}>
                                <li className={style.breadcrumbItem}>Root</li>
                            </ul>
                        )}

                        </span>*/}

        </div>
    )
}

export default BreadCrumb;
